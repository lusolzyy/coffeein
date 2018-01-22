package cafe.coffeein.cafe;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

//upload and download files
import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@RestController
public class CafeController {
	
	@Autowired
	private CafeService cafeService;
	
	@GetMapping("/cafes")
	@ResponseBody
	public List<Cafe> getAllCafes() {
		return cafeService.getAllCafes();
	}
	
	@PostMapping("/cafes/add")
	@ResponseBody
	public Cafe addCafe(@RequestBody Cafe cafe) {
		return cafeService.addCafe(cafe);
	}
	
	@PutMapping("/cafes/update")
	@ResponseBody
	public Future<Cafe> updateCafe(@RequestBody Cafe cafe) throws InterruptedException {
		return cafeService.updateCafe(cafe);
	}
	
	@DeleteMapping("/cafes/delete")
	public void deleteCafe(String cafeId) {
		cafeService.deleteCafe(cafeId);
	}
	
	@GetMapping("/cafe/{cafeId}")
	@ResponseBody
	public Cafe getCafeById(@PathVariable String cafeId) {
		return cafeService.getByCafeId(cafeId);
	}
	
	//upload and download files to and from mongodb
	@Autowired
	private GridFsTemplate gridFsTemplate;

	@PostMapping("/files")
	public HttpEntity<byte[]> createOrUpdate(@RequestParam("file") MultipartFile file) {
		String name = file.getOriginalFilename();
		
		//Use a random file name to avoid the file name conflict
		//Since the file name has already been set in the cafe database, so we not only need to change the file name in the GridFS database
		//but also we need to change the cafe database
		String fileExtension = "." + name.substring(name.lastIndexOf('.') + 1);
		String newRandomName = String.format("%d", (int)Math.round(Math.random() * 10000000)) + new Date().getTime() + fileExtension;
		
		try {
			Optional<GridFSDBFile> existing = maybeLoadFile(newRandomName);
			if (existing.isPresent()) {
				gridFsTemplate.delete(getFilenameQuery(newRandomName));
			}
			gridFsTemplate.store(file.getInputStream(), newRandomName, file.getContentType()).save();
			String resp = "<script>window.location = '/';</script>";
			
			//we need to connect the new random name file to the user who uploads it
			//first we need to find which user the picture belongs to
			//then we need to update the file name field of that user
			Cafe newAddedCafe = cafeService.getByCafePicture(name);
			newAddedCafe.setCafePicture(newRandomName);
			cafeService.deleteCafe(newAddedCafe.getCafeId());
			cafeService.addCafe(newAddedCafe);
			
			return new HttpEntity<>(resp.getBytes());
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

	@GetMapping("/files")
	public @ResponseBody List<String> list() {
		return getFiles().stream()
				.map(GridFSDBFile::getFilename)
				.collect(Collectors.toList());
	}

	@RequestMapping(path = "/files/{name:.+}", method = RequestMethod.GET)
	public HttpEntity<byte[]> get(@PathVariable("name") String name) {
		try {
			Optional<GridFSDBFile> optionalCreated = maybeLoadFile(name);
			if (optionalCreated.isPresent()) {
				GridFSDBFile created = optionalCreated.get();
				ByteArrayOutputStream os = new ByteArrayOutputStream();
				created.writeTo(os);
				HttpHeaders headers = new HttpHeaders();
				headers.add(HttpHeaders.CONTENT_TYPE, created.getContentType());
				return new HttpEntity<>(os.toByteArray(), headers);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.IM_USED);
		}
	}

	private List<GridFSDBFile> getFiles() {
		return gridFsTemplate.find(null);
	}

	private Optional<GridFSDBFile> maybeLoadFile(String name) {
		GridFSDBFile file = gridFsTemplate.findOne(getFilenameQuery(name));
		return Optional.ofNullable(file);
	}

	private static Query getFilenameQuery(String name) {
		return Query.query(GridFsCriteria.whereFilename().is(name));
	}
	
	//Upload multiple files test
	//the real process is the front end will call multiple times of this method to simulate a function
	//that upload multiple files in one request
	@ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/multiple")
    public HttpEntity<byte[]> upload(@RequestParam("file") MultipartFile file, @RequestParam("cafeId") String cafeId ) throws IOException, InterruptedException {

        String name = file.getOriginalFilename();
        String fileExtension = "." + name.substring(name.lastIndexOf('.') + 1);
		String newRandomName = String.format("%d", (int)Math.round(Math.random() * 10000000)) + new Date().getTime() + fileExtension;
		
        try {
			Optional<GridFSDBFile> existing = maybeLoadFile(newRandomName);
			if (existing.isPresent()) {
				gridFsTemplate.delete(getFilenameQuery(newRandomName));
			}
			gridFsTemplate.store(file.getInputStream(), newRandomName, file.getContentType()).save();
			String resp = "<script>window.location = '/';</script>";
			
			//add pictures file name to Cafe's profile
			Cafe selectedCafe = cafeService.getByCafeId(cafeId);
			List<String> pictures = selectedCafe.getUploadPictures();
			pictures.add(newRandomName);
			selectedCafe.setUploadPictures(pictures);
			cafeService.updateCafe(selectedCafe);
			
			return new HttpEntity<>(resp.getBytes());
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

}

package cafe.coffeein.cafe;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

@Service
public class CafeService {
	
	@Autowired
	private CafeRepository cafeRepository;
	
	public List<Cafe> getAllCafes() {
		return cafeRepository.findAll();
	}
	
	public Cafe addCafe(Cafe cafe) {
		return cafeRepository.save(cafe);
	}
	
//	public Cafe updateCafe(Cafe cafe) {
//		return cafeRepository.save(cafe);
//	}
	@Async
	public Future<Cafe> updateCafe(Cafe cafe) throws InterruptedException {
		return new AsyncResult<Cafe>(cafeRepository.save(cafe));
	}
	
	public void deleteCafe(String cafeId) {
		cafeRepository.delete(cafeId);
	}
	
	public Cafe getByCafePicture(String cafePicture) {
		return cafeRepository.findByCafePicture(cafePicture);
	}
	
	public Cafe getByCafeId(String cafeId) {
		return cafeRepository.findOne(cafeId);
	}
}

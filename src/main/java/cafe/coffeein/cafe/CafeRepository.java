package cafe.coffeein.cafe;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeRepository extends MongoRepository<Cafe, String>, QueryDslPredicateExecutor<Cafe> {
	public Cafe findByCafePicture(String cafePicture);
}

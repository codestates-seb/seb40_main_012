package seb40_main_012.back.collectionLike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.collectionLike.entity.CollectionLike;

public interface CollectionLikeRepository extends JpaRepository<CollectionLike,Long> {
}

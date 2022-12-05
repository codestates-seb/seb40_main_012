package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;

public interface BookCollectionLikeRepository extends JpaRepository<BookCollectionLike,Long> {
    BookCollectionLike findByUserUserIdAndBookCollectionCollectionId(Long userId, Long collectionId);

    Long countByBookCollectionCollectionId(Long id);
}

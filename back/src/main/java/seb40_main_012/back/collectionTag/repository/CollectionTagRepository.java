package seb40_main_012.back.collectionTag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.collectionLike.entity.CollectionLike;
import seb40_main_012.back.collectionTag.entity.CollectionTag;

public interface CollectionTagRepository extends JpaRepository<CollectionTag,Long> {
}

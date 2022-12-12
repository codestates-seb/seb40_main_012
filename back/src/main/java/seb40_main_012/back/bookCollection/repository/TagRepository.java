package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Optional<Tag> findByTagName(String name);
}

package seb40_main_012.back.bookWiki;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookWikiRepository extends JpaRepository<BookWiki, Long> {
}

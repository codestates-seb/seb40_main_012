package seb40_main_012.back.book;

import org.springframework.data.jpa.domain.Specification;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;

public class BookSpecification {
    public static Specification<Book> findBookByBookCollection(String isbn13) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("isbn13"), isbn13);
    }

    public static Specification<Book> findBookByGenre(Genre genre) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("genre"), genre);
    }

    public static Specification<Book> isPresentCollection() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isNotNull(root.get("collectionBooks"));
    }
}

package seb40_main_012.back.book;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.comment.entity.Comment;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-18T09:28:48+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book bookPostToBook(BookDto.Post postBook) {
        if ( postBook == null ) {
            return null;
        }

        Book.BookBuilder book = Book.builder();

        book.isbn13( postBook.getIsbn13() );
        book.averageRating( postBook.getAverageRating() );
        List<Comment> list = postBook.getComments();
        if ( list != null ) {
            book.comments( new ArrayList<Comment>( list ) );
        }

        return book.build();
    }

    @Override
    public Book bookPatchToBook(BookDto.Patch patchBook) {
        if ( patchBook == null ) {
            return null;
        }

        Book.BookBuilder book = Book.builder();

        return book.build();
    }

    @Override
    public Book bookRatingToBook(BookDto.Rating ratingBook) {
        if ( ratingBook == null ) {
            return null;
        }

        Book.BookBuilder book = Book.builder();

        return book.build();
    }

    @Override
    public List<BookDto.Response> booksToBookResponses(List<Book> books) {
        if ( books == null ) {
            return null;
        }

        List<BookDto.Response> list = new ArrayList<BookDto.Response>( books.size() );
        for ( Book book : books ) {
            list.add( bookToBookResponse( book ) );
        }

        return list;
    }
}

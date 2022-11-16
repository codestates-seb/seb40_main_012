package seb40_main_012.back.book;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.book.entity.Book;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:13:11+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book bookPostToBook(BookDto.Post postBook) {
        if ( postBook == null ) {
            return null;
        }

        Book book = new Book();

        return book;
    }

    @Override
    public Book bookPatchToBook(BookDto.Patch patchBook) {
        if ( patchBook == null ) {
            return null;
        }

        Book book = new Book();

        return book;
    }

    @Override
    public Book bookRatingToBook(BookDto.Rating ratingBook) {
        if ( ratingBook == null ) {
            return null;
        }

        Book book = new Book();

        return book;
    }

    @Override
    public BookDto.Response bookToBookResponse(Book book) {
        if ( book == null ) {
            return null;
        }

        BookDto.Response response = new BookDto.Response();

        return response;
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

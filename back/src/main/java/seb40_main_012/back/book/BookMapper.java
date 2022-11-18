package seb40_main_012.back.book;

import org.mapstruct.Mapper;
import seb40_main_012.back.book.entity.Book;


import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book bookPostToBook(BookDto.Post postBook);

    Book bookPatchToBook(BookDto.Patch patchBook);

//    Book bookViewToBook(BookDto.View viewBook);

    Book bookRatingToBook(BookDto.Rating ratingBook);

//    BookDto.Response bookToBookResponse(Book book);
    default BookDto.Response bookToBookResponse(Book book) {

        return BookDto.Response.builder()
                .bookId(book.getBookId())
                .isbn13(book.getIsbn13())
//                .genre(book.getGenre())
                .bookWiki(null)
                .averageRating(book.getAverageRating())
                .view(book.getView())
                .comments(book.getComments())
                .pairings(book.getPairings())
                .bookCollections(null)
                .similarBooks(null)
                .build();
    }

    List<BookDto.Response> booksToBookResponses(List<Book> books);

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    // 다대 다 매핑 준비
//    default BookCollectionBookDto.Response bookCollectionBookToBookResponse(BookCollectionBook bookCollectionBook) {
//
//        return BookCollectionBookDto.Response.builder()
//        .bookId(bookCollectionBook.getBook().getBookId())
//        .bookCollectionId(bookCollectionBook.getBookCollectionBookId())
//        .title(bookCollectionBook.getBookCollection().getTitle())
//        .tags(bookCollectionBook.getBookCollection().getTags())
//        .build();
//
//    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
}

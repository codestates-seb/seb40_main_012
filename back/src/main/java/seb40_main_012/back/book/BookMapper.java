package seb40_main_012.back.book;

import org.mapstruct.Mapper;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book bookPostToBook(BookDto.Post postBook);

    Book bookPatchToBook(BookDto.Patch patchBook);

    Book bookRatingToBook(BookDto.Rating ratingBook);

    default BookDto.Response bookToBookResponse(Book book) {

        if ( book == null ) {
            return null;
        }

        BookDto.Response.ResponseBuilder response = BookDto.Response.builder();

        response.isbn13( book.getIsbn13() );
        response.cover( book.getCover() );
        response.title( book.getTitle() );
        response.author( book.getAuthor() );
        response.subTitle( book.getSubTitle() );
        response.itemPage( book.getItemPage() );
        response.genre( book.getGenre() );
        response.pubDate( book.getPubDate() );
        response.publisher( book.getPublisher() );
        response.adult( book.getAdult() );
        response.description( book.getDescription() );
        response.bookWiki( book.getBookWiki() );
        response.averageRating( book.getAverageRating() );
        response.ratingCount( book.getRatingCount() );
        response.view( book.getView() );
        response.commentCount( book.getCommentCount() );
        response.pairingCount( book.getPairingCount() );
        response.bookCollectionCount( book.getBookCollectionCount() );
        List<Comment> list = book.getComments();
        if ( list != null ) {
            response.comments( new SliceImpl<>( list.stream().sorted(Comparator.comparing(Comment::getLikeCount).reversed()).collect(Collectors.toList())));
        }
        List<Pairing> list1 = book.getPairings();
        if ( list1 != null ) {
            response.pairings( new SliceImpl<>( list1.stream().sorted(Comparator.comparing(Pairing::getLikeCount).reversed()).collect(Collectors.toList())));
            response.bestPairing(list1.stream().max(Comparator.comparing(Pairing::getLikeCount)));
        }
        List<BookCollection> list2 = book.getBookCollections();
        if ( list2 != null ) {
            response.bookCollections( new SliceImpl<>( list2.stream().sorted(Comparator.comparing(BookCollection::getLikeCount).reversed()).collect(Collectors.toList())));
        }
        return response.build();
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

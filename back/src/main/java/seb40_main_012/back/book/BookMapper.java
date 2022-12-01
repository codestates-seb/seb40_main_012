package seb40_main_012.back.book;

import org.mapstruct.Mapper;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.SliceImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.rating.Rating;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book bookPostToBook(BookDto.Post postBook);

    Book bookPatchToBook(BookDto.Patch patchBook);

    Book bookRatingToBook(BookDto.Rating ratingBook);

    default BookDto.Response bookToBookResponse(Book book) {

        if (book == null) {
            return null;
        }

        BookDto.Response.ResponseBuilder response = BookDto.Response.builder();

        response.isbn13(book.getIsbn13());
        if (!Objects.equals(SecurityContextHolder.getContext().getAuthentication().getName(), "anonymousUser")
                && book.getRatings() != null) {
            response.myRating(book.getRatings().stream()
                    .filter(rating -> Objects.equals(rating.getUser().getEmail(), SecurityContextHolder.getContext().getAuthentication().getName()))
                    .mapToDouble(Rating::getUserBookRating).sum());
            response.isBookmarked(book.isBookmarked());

            response.myComment(book.getComments().stream()
                    .filter(comment -> Objects.equals(comment.getUser().getEmail(), SecurityContextHolder.getContext().getAuthentication().getName()))
                    .findFirst());
        }
        response.cover(book.getCover());
        response.title(book.getTitle());
        response.author(book.getAuthor());
        response.subTitle(book.getSubTitle());
        response.itemPage(book.getItemPage());
        response.genre(book.getGenre());
        response.pubDate(book.getPubDate());
        response.publisher(book.getPublisher());
        response.adult(book.getAdult());
        response.description(book.getDescription());
        response.bookWiki(book.getBookWiki());
        response.averageRating(book.getAverageRating());
        response.ratingCount(book.getRatingCount());
        response.view(book.getView());
        response.commentCount(book.getCommentCount());
        response.pairingCount(book.getPairingCount());
        response.bookCollectionCount(book.getBookCollectionCount());
        List<Comment> list = book.getComments();
//        if ( list != null ) { // 이 부분 주석처리 하면 무한스크롤
//            response.comments( new PageImpl<>( list.stream().sorted(Comparator.comparing(Comment::getLikeCount).reversed()).collect(Collectors.toList())));
//        }
        List<Pairing> list1 = book.getPairings();
        if (list1 != null) {
            response.pairings(new SliceImpl<>(list1.stream().sorted(Comparator.comparing(Pairing::getLikeCount).reversed()).collect(Collectors.toList())));
            response.bestPairing(list1.stream().max(Comparator.comparing(Pairing::getLikeCount)));
        }
        List<BookCollection> list2 = book.getBookCollections();
        if (list2 != null) {
            response.bookCollections(new SliceImpl<>(list2.stream().sorted(Comparator.comparing(BookCollection::getLikeCount).reversed()).collect(Collectors.toList())));
//            response.bookCollections(new SliceImpl<>(list2.stream().sorted(Comparator.comparing(BookCollection::getLikeCount).reversed()).collect(Collectors.toList())));
        }
        return response.build();
    }

    default List<BookDto.Response> booksToBookResponses(List<Book> books) {

        if (books == null) {
            return null;
        }

        List<BookDto.Response> list = new ArrayList<BookDto.Response>(books.size());
        for (Book book : books) {

            if (book.getComments() != null) {
                book.setComments(book.getComments().stream()
                        .sorted(Comparator.comparing(Comment::getLikeCount).reversed())
                        .collect(Collectors.toList()));
            }

            list.add(bookToBookResponse(book));
        }

        return list;

    }
}


package seb40_main_012.back.search;

import org.mapstruct.Mapper;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.dto.UserDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SearchMapper {

    default List<BookCollection> bookCollectionsSearchToBookCollections(List<BookCollection> collections) {

        if (collections == null) {
            return null;
        }

        List<BookCollection> response = new ArrayList<>();

        for (int i = 0; i < collections.size(); i++) {

            BookCollection bookCollection = new BookCollection();

            bookCollection.setCollectionId(collections.get(i).getCollectionId());
            bookCollection.setTitle(collections.get(i).getTitle());
            bookCollection.setLikeCount(collections.get(i).getLikeCount());
            bookCollection.setComments(collections.get(i).getComments());
            bookCollection.setCollectionBooks(collections.get(i).getCollectionBooks());
            bookCollection.setBookIsbn13(collections.get(i).getBookIsbn13());

                if (bookCollection.getCollectionBooks().size() == 0) {
                    bookCollection.setCollectionCover(null);
                }

                if (bookCollection.getCollectionBooks().size() == 1) {
                    bookCollection.setCollectionCover(
                            List.of(
                                    bookCollection.getCollectionBooks().get(0).getBook().getCover()
                            ));
                } else if (bookCollection.getCollectionBooks().size() == 2) {
                    bookCollection.setCollectionCover(
                            List.of(
                                    bookCollection.getCollectionBooks().get(0).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(1).getBook().getCover()
                            ));
                } else if (bookCollection.getCollectionBooks().size() == 3) {
                    bookCollection.setCollectionCover(
                            List.of(
                                    bookCollection.getCollectionBooks().get(0).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(1).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(2).getBook().getCover()
                            ));
                } else if (bookCollection.getCollectionBooks().size() >= 4) {

                    System.out.println("----------------------------------------------");
                    System.out.println(bookCollection.getCollectionBooks().get(0).getBook().getCover());
                    System.out.println(bookCollection.getCollectionBooks().get(1).getBook().getCover());
                    System.out.println(bookCollection.getCollectionBooks().get(2).getBook().getCover());
                    System.out.println(bookCollection.getCollectionBooks().get(3).getBook().getCover());
                    System.out.println("----------------------------------------------");
                    bookCollection.setCollectionCover(
                            List.of(
                                    bookCollection.getCollectionBooks().get(0).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(1).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(2).getBook().getCover(),
                                    bookCollection.getCollectionBooks().get(3).getBook().getCover()
                            )
                    );

            } else bookCollection.setCollectionCover(collections.get(i).getCollectionCover());

            response.add(bookCollection);
        }
        return response;
    }
}

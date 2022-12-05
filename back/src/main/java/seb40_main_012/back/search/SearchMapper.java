package seb40_main_012.back.search;

import org.mapstruct.Mapper;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.dto.UserDto;

import java.util.ArrayList;
import java.util.List;

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
            bookCollection.setCollectionCover(collections.get(i).getCollectionCover());
            bookCollection.setLikeCount(collections.get(i).getLikeCount());
            bookCollection.setComments(collections.get(i).getComments());
        }

        return response;
    }


}

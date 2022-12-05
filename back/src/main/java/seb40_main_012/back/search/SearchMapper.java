package seb40_main_012.back.search;

import org.mapstruct.Mapper;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SearchMapper {

    List<BookCollection> bookCollectionsSearchToBookCollections(List<BookCollection> bookCollections);

}

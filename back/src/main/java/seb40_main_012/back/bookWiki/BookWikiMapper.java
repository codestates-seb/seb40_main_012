package seb40_main_012.back.bookWiki;

import org.mapstruct.Mapper;
import seb40_main_012.back.bookWiki.BookWikiDto;
import seb40_main_012.back.bookWiki.BookWiki;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookWikiMapper {

    BookWiki bookWikiPostToBookWiki(BookWikiDto.Post postBookWiki);
    BookWiki bookWikiPatchToBookWiki(BookWikiDto.Patch patchBookWiki);
    BookWiki bookWikiViewToBookWiki(BookWikiDto.View viewBookWiki);
    BookWikiDto.Response bookWikiTOBookWikiResponse(BookWiki bookWiki);

}

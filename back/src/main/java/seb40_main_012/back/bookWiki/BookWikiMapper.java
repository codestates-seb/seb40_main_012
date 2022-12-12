package seb40_main_012.back.bookWiki;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookWikiMapper {

    BookWiki bookWikiPostToBookWiki(BookWikiDto.Post postBookWiki);
    BookWiki bookWikiPatchToBookWiki(BookWikiDto.Patch patchBookWiki);
    BookWikiDto.Response bookWikiToBookWikiResponse(BookWiki bookWiki);

}

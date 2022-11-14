package seb40_main_012.back.bookWiki;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:13:12+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class BookWikiMapperImpl implements BookWikiMapper {

    @Override
    public BookWiki bookWikiPostToBookWiki(BookWikiDto.Post postBookWiki) {
        if ( postBookWiki == null ) {
            return null;
        }

        BookWiki bookWiki = new BookWiki();

        return bookWiki;
    }

    @Override
    public BookWiki bookWikiPatchToBookWiki(BookWikiDto.Patch patchBookWiki) {
        if ( patchBookWiki == null ) {
            return null;
        }

        BookWiki bookWiki = new BookWiki();

        return bookWiki;
    }

    @Override
    public BookWiki bookWikiViewToBookWiki(BookWikiDto.View viewBookWiki) {
        if ( viewBookWiki == null ) {
            return null;
        }

        BookWiki bookWiki = new BookWiki();

        return bookWiki;
    }

    @Override
    public BookWikiDto.Response bookWikiToBookWikiResponse(BookWiki bookWiki) {
        if ( bookWiki == null ) {
            return null;
        }

        BookWikiDto.Response response = new BookWikiDto.Response();

        return response;
    }
}

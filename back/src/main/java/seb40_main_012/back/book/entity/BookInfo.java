package seb40_main_012.back.book.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Builder
public class BookInfo {

    private final String title;
    private final String Author;
    private final long yearOfPublication;
    private final long page;
    private final long isbn13;
    private final long isbn10;
    private final String summary;
}

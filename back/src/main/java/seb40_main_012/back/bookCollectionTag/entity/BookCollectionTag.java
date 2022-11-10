package seb40_main_012.back.bookCollectionTag.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollectionTag {
    @Id
    private final Long BookCollectionTagId;
}

package seb40_main_012.back.bookCollection.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
public class ISBN {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long isbnId;
    private String isbnNum;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

}

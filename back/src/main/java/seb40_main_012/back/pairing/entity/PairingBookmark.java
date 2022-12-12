package seb40_main_012.back.pairing.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;

@Builder
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class PairingBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BookCollectionBookMarkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pairing_id")
    private Pairing pairing;

    @ManyToOne(fetch = FetchType.LAZY) //
    @JoinColumn(name = "user_id")
    private User user;

    public PairingBookmark(Pairing pairing, User user) {
        this.pairing = pairing;
        this.user = user;
    }
}

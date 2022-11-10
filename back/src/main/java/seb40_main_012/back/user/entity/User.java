package seb40_main_012.back.user.entity;

import jdk.jfr.Category;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.userCategory.entity.UserCategory;

import javax.persistence.Entity;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class User {

    private final Long userId;
    private final String email;
    private final String password;
    private final List<UserCategory> category;



}

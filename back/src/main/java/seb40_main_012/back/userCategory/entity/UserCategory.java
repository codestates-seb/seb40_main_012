package seb40_main_012.back.userCategory.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.Entity;
import java.util.List;

@Getter
@RequiredArgsConstructor
//@Entity
public class UserCategory {


    private final Long categoryId;
    private final List<Category> category;
    private final User user;
}

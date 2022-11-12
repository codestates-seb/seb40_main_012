package seb40_main_012.back.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;

import javax.persistence.Entity;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class UserCategory {

    private Long categoryId;
    private List<Category> category;
    private User user;
}
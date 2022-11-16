package seb40_main_012.back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ListResponseDto<T> {
    private Long listCount;
    private List<T> data;
}

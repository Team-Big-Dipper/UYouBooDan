package TeamBigDipper.UYouBooDan.testDomain.controller;

import TeamBigDipper.UYouBooDan.testDomain.dto.PageInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {

    /**
     * Mock Post
     * @return 200
     */
    @PostMapping
    public ResponseEntity<String> postArticle() {

        return new ResponseEntity<>("Post Success", HttpStatus.CREATED);
    }


    /**
     * Mock Patch
     * @return 200
     */
    @PatchMapping("/edit")
    public ResponseEntity<String> patchArticle() {

        return new ResponseEntity<>("Patch Success", HttpStatus.OK);
    }


    /**
     * Mock Delete (상태패턴 사용을 위해 실제로는 Patch로 할 것임
     * @return 200 OK로 변경하기
     */
    @PatchMapping("/remove")
    public ResponseEntity<String> deleteArticle() {
        // 상태변환 필요
        return new ResponseEntity<>("Delete Success", HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<String> getArticle() {

        return new ResponseEntity<>("Get Success", HttpStatus.OK);
    }


    /**
     *
     * @return 객체 ResponseDto를 Pageable로 감싸서 반환
     */
    @GetMapping
    public ResponseEntity<PageInfoDto<String>> getArticles(@RequestParam Pageable pageable) {
        List<String> list = new ArrayList<>();
        int cnt = 0;
        while(cnt++<10) list.add("Mock"+ cnt);

        Page<String> dtoPage = new PageImpl<>(list, pageable, list.size());
        return new ResponseEntity<>(new PageInfoDto<>(dtoPage), HttpStatus.OK);
    }
}

package com.example.demo;

import com.example.demo.model.Content;
import com.example.demo.model.Service.ContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin // Instead of CORS and too much helpful
@RestController
@RequestMapping("/content")
public class ContentResource {
    private final ContentService contentService;

    public ContentResource(ContentService contentService) {
        this.contentService = contentService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Content>> getAllContents () {
        List<Content> contents = contentService.findAllContent();
        return new ResponseEntity<>(contents, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Content> getContentById (@PathVariable("id") Long id) {
        Content content = contentService.findContentById(id);
        return new ResponseEntity<>(content, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Content> addContent(@RequestBody Content content) {
        Content newContent = contentService.addContent(content);
        return new ResponseEntity<>(newContent, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Content> updateContent(@RequestBody Long id,  Content content) {
        Content updateContent = contentService.updateContent(id, content);
        return new ResponseEntity<>(updateContent, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable("id") Long id) {
        contentService.deleteContent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

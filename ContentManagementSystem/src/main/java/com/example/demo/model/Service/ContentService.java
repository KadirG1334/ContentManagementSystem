package com.example.demo.model.Service;

import com.example.demo.model.Content;
import com.example.demo.model.exception.UserNotFoundException;
import com.example.demo.model.repo.ContentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    private final ContentRepo contentRepo;

    public ContentService(ContentRepo contentRepo) {
        this.contentRepo = contentRepo;
    }
    public Content addContent(Content content){
        content.setStatus("InProgress");
        return contentRepo.save(content);
    }
    public List<Content> findAllContent() {

        return contentRepo.findAll();
    }//for search label
    public Content updateContent(Long id, Content content) {//!!!!!
        Content currentContent = contentRepo.findById(id).orElse(null);
        if (currentContent == null) {
            throw new UserNotFoundException("User by id  was not found");
        }
        currentContent.setName(content.getName());
        currentContent.setLicenses(content.getLicenses());
        currentContent.setVideoUrl(content.getVideoUrl());
        return contentRepo.save(currentContent);




    }
    public Content findContentById(Long id) {
        return contentRepo.findContentById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    public void deleteContent(Long id){
        Content content = contentRepo.findById(id).orElse(null);
        if (content == null) {
            throw new UserNotFoundException("User by id " + id + " was not found");
        }
        contentRepo.delete(content);
    }
    public Content getContent(Long id) {
        return contentRepo.findById(id).orElse(null);
    }





}


package com.example.demo.model.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Content;

import java.util.Optional;
public interface ContentRepo extends JpaRepository<Content, Long> { //primary key id and type is long
    void deleteContentById(Long id);

    Optional<Content> findContentById(Long id);


}

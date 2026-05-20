package com.galeria.controller;

import com.galeria.model.Elemento;
import com.galeria.repository.GaleriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/galeria")
public class GaleriaController {

    @Autowired
    private GaleriaRepository repository;


    @GetMapping
    public List<Elemento> getAll() {
        return repository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Elemento> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Elemento> create(@RequestBody Elemento elemento) {
        Elemento creado = repository.save(elemento);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Elemento> update(@PathVariable Long id,
                                           @RequestBody Elemento datos) {
        return repository.update(id, datos)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

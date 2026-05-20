package com.galeria.model;


public class Elemento {

    private Long id;
    private String titulo;
    private String categoria;
    private int anio;
    private String descripcion;


    public Elemento() {}


    public Elemento(Long id, String titulo, String categoria, int anio, String descripcion) {
        this.id          = id;
        this.titulo      = titulo;
        this.categoria   = categoria;
        this.anio        = anio;
        this.descripcion = descripcion;
    }


    public Long   getId()          { return id; }
    public String getTitulo()      { return titulo; }
    public String getCategoria()   { return categoria; }
    public int    getAnio()        { return anio; }
    public String getDescripcion() { return descripcion; }


    public void setId(Long id)                   { this.id = id; }
    public void setTitulo(String titulo)         { this.titulo = titulo; }
    public void setCategoria(String categoria)   { this.categoria = categoria; }
    public void setAnio(int anio)                { this.anio = anio; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}

package com.galeria.repository;

import com.galeria.model.Elemento;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class GaleriaRepository {


    private final AtomicLong nextId = new AtomicLong(20);


    private final List<Elemento> elementos = new ArrayList<>(List.of(
            new Elemento( 1L, "El ataque del Cocadrilo",
                    "Comedia - Terror", 2024,
                    "Una redada masiva de drogas provoca que toneladas de metanfetamina contaminen las alcantarillas locales. " +
                            "Un enorme caimán de 10 metros enloquecido tras comerse la carga provoca el pánico en un pequeño pueblo de Florida."),

            new Elemento( 2L, "Cocaine Bear",
                    "Comedia - Terror", 2023,
                    "Un extraño grupo de policías, delincuentes, turistas y adolescentes se reúnen en un bosque de Georgia " +
                            "cuando un oso negro de 150 kilos ingiere una gran cantidad de cocaína y crea el caos impulsado por las drogas."),

            new Elemento( 3L, "The Velocipastor",
                    "Terror - Acción", 2017,
                    "Después de perder a sus padres, un sacerdote viaja a China, donde hereda una habilidad misteriosa " +
                            "que le permite convertirse en un dinosaurio."),

            new Elemento( 4L, "Rubber, la llanta asesina",
                    "Terror", 2010,
                    "Un neumático homicida descubre su propio poder y se dirige a una localidad en el desierto, " +
                            "obsesionado con una misteriosa mujer."),

            new Elemento( 5L, "Stranger Things",
                    "Thriller - Terror - Fantástico - Drama", 2016,
                    "Stranger Things sigue a un grupo de niños de Hawkins, Indiana, en los años 80, que investigan la misteriosa " +
                            "desaparición de uno de sus amigos. Aparece Once, una niña con poderes telequinéticos escapada de un laboratorio secreto."),

            new Elemento( 6L, "Dark",
                    "Intriga - Drama - Ciencia ficción", 2017,
                    "Dark trata sobre la desaparición de varios niños en el pueblo alemán de Winden, lo que revela un complejo " +
                            "entramado de viajes en el tiempo que conecta a cuatro familias a lo largo de distintas épocas."),

            new Elemento( 7L, "From",
                    "Terror - Intriga", 2022,
                    "From sigue a un grupo de personas atrapadas en un pueblo del que no pueden escapar. Al caer la noche, " +
                            "criaturas monstruosas con apariencia humana salen a cazar, obligando a los habitantes a protegerse."),

            new Elemento( 8L, "Ovejas asesinas",
                    "Terror", 2006,
                    "Un grupo de activistas ineptos libera un cordero mutante en una remota granja. Las pacíficas ovejas " +
                            "se transforman en máquinas de matar sedientas de sangre con un particular gusto por la carne humana."),

            new Elemento( 9L, "El ataque de los tomates asesinos",
                    "Terror", 1978,
                    "Unos tomates provocan un alboroto, dañando a víctimas inocentes."),

            new Elemento(10L, "Crackoon",
                    "Terror", 2024,
                    "Un mapache inocente ingiere una droga callejera sintética y se transforma en una máquina de matar mutante " +
                            "que aterroriza a campistas y residentes de una comunidad montañosa."),

            new Elemento(11L, "Scary Movie",
                    "Comedia", 2000,
                    "Un año después de atropellar a un hombre y deshacerse del cadáver, un grupo de adolescentes es " +
                            "acechado por un asesino en serie bastante inútil."),

            new Elemento(12L, "Baa Baa Land",
                    "Drama", 2017,
                    "8 horas de imágenes de ovejas."),

            new Elemento(13L, "Castores Zombie",
                    "Terror", 2014,
                    "Tres amigas de la universidad llegan a una cabaña junto al río. Serán atacadas por un grupo de " +
                            "castores zombis hambrientos de sangre humana."),

            new Elemento(14L, "Sharknado",
                    "Terror - Ciencia Ficción", 2013,
                    "Un salvaje huracán ha succionado gran parte del agua del océano y, con ella, a cientos de hambrientos " +
                            "tiburones que devoran todo a su paso por la aterrada ciudad de Los Ángeles."),

            new Elemento(15L, "Bambi: la venganza",
                    "Terror - Acción", 2025,
                    "Después de perder a su madre a manos de un cazador, Bambi desaparece. En su lugar surge una bestia " +
                            "sedienta de venganza, mutada por la rabia y el dolor, que acecha a todo el que entre en su bosque."),

            new Elemento(16L, "Torrente, el brazo tonto de la ley",
                    "Comedia - Acción", 1998,
                    "Torrente es un policía español, machista, racista y alcohólico. Este magnífico representante de las " +
                            "fuerzas del orden vive con su padre hemipléjico en Madrid y descubre una red de narcotraficantes."),

            new Elemento(17L, "Cocaine Crabs from Outer Space",
                    "Terror - Comedia - Basada en hechos reales", 2022,
                    "Dos cangrejos extraterrestres aterrizan en el planeta Tierra y son capturados por una fraternidad, " +
                            "cuyos miembros los obligan a ingerir cocaína."),

            new Elemento(18L, "Borat",
                    "Comedia", 2006,
                    "El reportero de Kazajistán Borat Sagdiyev es enviado a Estados Unidos por el Gobierno de su país " +
                            "para realizar un reportaje sobre la que, para Borat, es la nación más maravillosa de la Tierra."),

            new Elemento(19L, "Towers",
                    "Fantástico", 2027,
                    "Dos pilotos demuestran que ni siquiera dos torres se pueden interponer entre ellos y sus creencias. " +
                            "Disclaimer: Película no real, creada con IA por terceros con fines cómicos.")
    ));


    public List<Elemento> findAll() {
        return new ArrayList<>(elementos);
    }


    public Optional<Elemento> findById(Long id) {
        return elementos.stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }


    public Elemento save(Elemento elemento) {
        elemento.setId(nextId.getAndIncrement());
        elementos.add(elemento);
        return elemento;
    }

    public Optional<Elemento> update(Long id, Elemento datos) {
        return findById(id).map(existente -> {
            existente.setTitulo(datos.getTitulo());
            existente.setCategoria(datos.getCategoria());
            existente.setAnio(datos.getAnio());
            existente.setDescripcion(datos.getDescripcion());
            return existente;
        });
    }

    public boolean deleteById(Long id) {
        return elementos.removeIf(e -> e.getId().equals(id));
    }
}


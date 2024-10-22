import styles from "./annimales.module.css";
import Link from "next/link";

export default function Animales() {
  return (
        <div className={styles.section_animales}>

            <h1>Categorias</h1>
            <p>Todo lo que ofrecemos</p><br /><br />

            <div className={styles.cartas_animales}>

                <div className={styles.enlace_ganado}>
                    <Link href={"/"}>
                    <div className={styles.enlace_text}>
                        <h2>Ganado</h2>
                        <p>Vacuno, Porcino, Caprino</p>
                    </div>
                    </Link>
                </div>

                <div className={styles.enlace_granos}>
                    <div className={styles.enlace_text}>

                        <Link href={"/"}>
                            <h2>Granos</h2>
                            <p>Trigo, Lentejas, Arroz</p>
                        </Link>

                    </div>
                    
                </div>

                <div className={styles.enlace_tuberculos}>
                    <div className={styles.enlace_text}>
                        <Link href={"/"}>
                            <h2>Tubérculos</h2>
                            <p>Papas, Jengibre, Yuca</p>
                        </Link>
                        

                    </div>
                    
                </div>

            </div>

        </div>
  );
}

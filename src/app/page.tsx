import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <div className={styles.home}>
      <div className={styles.texto}>
        <h3>¡Bienvenidos a Agromercio!</h3>
        <br />
        <p>Agromercio es la página web dedicada a la compra y venta de productos agropecuarios. Con éste proyecto no solo queremos 
        agilizar el proceso de compra y venta, sino también hacer más accesible esta industria a todos los panameños, vendedores o 
        compradores. Paralelamente, esta página busca impulsar el desarrollo de IT y la industria agropecuaria.</p><br />
        <p>-Los Cuates</p>
      </div>
      <br />
    </div>
    </>
  );
}

'use client';

import styles from "./estadisticas.module.css";

import { useEffect } from 'react';
import { arrozChart } from '@/app/components/chart'; 
import { GanadoChart } from "../components/ganadoChart";
import { tuberculosChart } from "../components/tuberculosChart";
export default function Page() {
  useEffect(() => {
    arrozChart('arroz');
  }, []);

  useEffect(() => {
    GanadoChart('ganado_chart');
  }, []);

  useEffect(() => {
    tuberculosChart('tuberculos_chart');
  }, []);

  return (
    <>
    <div className={styles.estadisticas_section}>
      <h1>🌾Variación del Precio de Arroz en (USD)</h1>
      <div id="arroz" style={{ width: '100%', height: '600px' }}></div>
    </div>
    <br /><br /><hr /><br /><br />
    <div className={styles.estadisticas_section}>
      <h1>🐮Variación del Precio del Ganado en (USD)</h1>
      <div id="ganado_chart" style={{ width: '100%', height: '600px' }}></div>
    </div>
    <br /><br /><hr /><br /><br />
    <div className={styles.estadisticas_section}>
      <h1>🥔Variación del Precio del Ganado en (USD)</h1>
      <div id="tuberculos_chart" style={{ width: '100%', height: '600px' }}></div>
    </div>
    
    </>
    
  );
}


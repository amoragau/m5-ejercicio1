# Sistema Hospital las Casitas

## 📋 Descripción
Sistema web para la gestión de citas médicas desarrollado con React, Vite y Tailwind CSS. 

## 🚀 Características Principales
- Visualización de doctores por especialidad.
- Formulario de agendamiento de citas.
- Selección de doctor
- Panel de consultas.
- Interfaz responsiva y amigable.

## 🛠️ Tecnologías Utilizadas
- React
- Vite
- Tailwind CSS
- useState y useEffect Hooks

## 📦 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/amoragau/m5-ejercicio1.git
cd m4-ejercicio1
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🔧 Configuración

### Estructura de Archivos
```
m5-ejercicio1/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppointmentForm.jsx
│   │   ├── Card.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── DoctorDetailsModal.jsx
│   │   ├── DoctorList.jsx
│   │   ├── HOCLoadAndError.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profiler.jsx
│   │   ├── ServiceList.jsx
│   │   └── ServiceListWithLoading.jsx
│   ├── context/
│   │   └── HospitalContext.jsx
│   ├── hooks/
│   │   ├── useDoctors.jsx
│   │   └── useServices.jsx
│   ├── services/
│   │   └── HospitalApi.js
│   ├── views/
│   │   ├── AppointmentView.jsx
│   │   ├── ContactView.jsx
│   │   ├── HomeView.jsx
│   │   └── MedicalTeamView.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── README.md
├── tailwind.config.js 
```

### 1. Implementación de Peticiones con useEffect y useState

Se implementa `useEffect` y `useState` en:
- `useDoctors.jsx`: petición api doctores.
- `useServices.jsx`: petición api servicios.

Los datos son mostrados en la vista `MedicalTeamView.jsx`.

### 2. Uso de Fetch API o Axios para el Consumo de la API

Se utiliza **Fetch API** en `/services/HospitalApi.js`

```js
export const HospitalAPI = {
  getDoctors: async () => {
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/doctores");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  getServices: async () => {
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/services");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};
```
Se seleccionó **Fetch API** sobre **Axios** porque se como se ocupa.


### 3. Peticiones Basadas en Eventos del Usuario
En la vista `MedicalTeamView.jsx` se implementa un boton para recargar la llamada a la Api de servicios y otro para los doctores.

### 4. Manejo de Errores en Peticiones Asíncronas

En la vista `MedicalTeamView.jsx` se implementa un boton para recargar la llamada a la Api de servicios y otro para los doctores.
Para mostrarlos por la interfaz se debe modificar el archivo `services/HospitalApi.js`

```js
export const HospitalAPI = {
  getDoctors: async () => {
    //modificar la URI
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/doctores");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  getServices: async () => {
    //modificar la URI
    const response = await fetch("https://677dc7ba94bde1c1252965c2.mockapi.io/api/v1/services");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};
```

### 5. Optimización del Rendimiento al Omitir Efectos en useEffect

Se implementa en `useServices.jsx` y `useDoctors.jsx`:

- Control de montaje inicial :
```jsx
const isFirstRender = useRef(true);
```
Se usa useRef para rastrear si es la primera renderización.

Solo se hace la petición en el montaje inicial o cuando hay un trigger explícito.

- Cancelación de peticiones pendientes:
```jsx
const abortController = useRef(null);
```
Se usa AbortController para cancelar peticiones pendientes.

Se evitan actualizaciones de estado innecesarias.

- Función Cleanup:
```jsx
return () => {
  if (abortController.current) {
    abortController.current.abort();
  }
};
```
Se limpian las peticiones pendientes cuando el componente se desmonta.

Se evitan los memory leaks y actualizaciones en componentes desmontados.

- Manejo optimizado de errores:
```jsx
if (error.name !== 'AbortError') {
  setError(error.message);
}
```
No se muestran errores por cancelaciones intencionales.

Mejora la experiencia de usuario.

- Dependencias mínimas en useEffect:
```jsx
useEffect(() => {
  if (isFirstRender.current || refreshTrigger) {
    // ...
  }
}, [fetchServices, refreshTrigger]);
```
Solo las dependencias necesarias están incluidas.

Se evitan ciclos infinitos y re-renders innecesarios.


- Memoización de la función de fetch:
```jsx
const fetchServices = useCallback(async () => {
  // ...
}, []);
```
La función se mantiene estable entre renders.

Se evita re-renders innecesarios.

## 📱 Responsive Design
El sistema está diseñado para funcionar en:
- Dispositivos móviles
- Tablets
- Escritorio

## Recursos ✒️

* [unDraw](https://undraw.co)
* [DALL-E](https://openai.com/index/dall-e-3/)
* [ChatGPT](https://openai.com/index)

## Autor
Desarrollado Ana Moraga.

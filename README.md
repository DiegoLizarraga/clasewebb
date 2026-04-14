#  Proyectos del Repositorio

## Conceptos Base

### API (Application Program Interface)
Métodos HTTP (CRUD):
| Operación | Método |
|-----------|--------|
| C (Create) | POST |
| R (Read) | GET |
| U (Update) | PUT / PATCH |
| D (Delete) | DELETE |

### WebSockets
- Permiten abrir un **canal de comunicación** bidireccional en tiempo real entre cliente y servidor.
- Ejemplo de uso: Chat por `Room:id`
  - `GET` → Leer mensajes de la sala
  - `POST / PUT` → Enviar mensajes



## 1. Calculadora
- JavaScript (JS)
- Manipulación del DOM
- Estilos (CSS)

## 2. Profile
- React
- Manejo de Estado
- API Resend
- Estilos (CSS)
- Endpoints:
  - `POST` → Crear perfil
  - `PUT` → Actualizar perfil

## 3. Pokémon
- API GET
- Renderizar datos
- useEffect (React Hook)

## 4. WhatsApp Clone *(tsapp)*
- **Frontend:** React (UI)
- **Backend:** Node.js + Express.js
- **Base de datos:** DB
- **Comunicación en tiempo real:** WebSockets
- **Salas de chat** identificadas por `Room:id`
  - `GET` → Obtener mensajes
  - `POST / PUT` → Enviar mensajes

 ---

##  Arquitectura del whassaao 

```
UI / React  ←────────────────  DB
                ↑
         Server Node.js
          Express.js (app)
                ↓
               DB
```

- **UI / React** → Interfaz de usuario (Frontend)
- **Server Node.js + Express.js** → Backend que maneja las rutas y lógica
- **DB** → Base de datos conectada al servidor
- El servidor responde de vuelta al cliente (React)

---

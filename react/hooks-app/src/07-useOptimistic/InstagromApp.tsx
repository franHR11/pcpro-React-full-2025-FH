// Hook de React para manejar el estado de los comentarios
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

// Definición de la interfaz para tipar los comentarios
interface Comment {
  id: number; // Identificador único del comentario
  text: string; // Contenido del comentario
  optimistic?: boolean; // Flag para indicar comentarios optimistas (aún no guardados en servidor)
}

let lastId = 2;

export const InstagromApp = () => {
  const [isPending, StartTransition] = useTransition();
  // Estado que almacena la lista de comentarios, inicializado con 2 comentarios de ejemplo
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newCommentText: string) => {
      lastId++;
      return [
        ...currentComments,
        {
          id: lastId,
          text: newCommentText,
          optimistic: true,
        },
      ];
    }
  );

  // Función asíncrona que maneja la adición de nuevos comentarios
  const handleAddComment = async (formData: FormData) => {
    // Extrae el texto del comentario del formulario
    const messageText = formData.get("post-message") as string;
    addOptimisticComment(messageText);

    StartTransition(async () => {
      // Simula una petición al servidor con un retraso de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // Actualiza el estado agregando el nuevo comentario al final del array
      setComments((prev) => [
        ...prev, // Mantiene los comentarios anteriores
        {
          id: new Date().getTime(), // Genera un ID basado en timestamp
          text: messageText,
        },
      ]);

      setComments((prev) => prev);
      toast("Error al agregar el comentario", {
        description: "intente nuevamente",
        duration: 10_000,
        position: "top-right",
        action: {
          label: "Cerrar",
          onClick: () => toast.dismiss(),
        },
      });
    });
  };

  return (
    // Contenedor principal con fondo gris oscuro y centrado
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Sección del post - imagen y descripción */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Sección de comentarios - lista de comentarios existentes */}
      <ul className="flex flex-col items-start justify-center bg-gray-300 w-[500px] p-4">
        {optimisticComments.map((comment) => (
          // Cada comentario individual
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            {/* Avatar circular con inicial "A" */}
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            {/* Texto del comentario */}
            <p className="text-black">{comment.text}</p>
            {/* Indicador de envío para comentarios optimistas */}
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nuevos comentarios */}
      <form
        action={handleAddComment} // Usa la función como server action
        className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
      >
        {/* Campo de texto para escribir el comentario */}
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

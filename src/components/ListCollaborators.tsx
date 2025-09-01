import { Collaborator } from "@/types/global";
import iconDelete from "../assets/icons/deleteColaborate.svg";
import { deleteColaborate } from "@/libs/lib_colaborators";

interface PropsListColaborators {
  collaborators: Collaborator[];
  actualUser: string;
  creator: string;
}

export const ListCollaborators = ({
  collaborators,
  actualUser,
  creator,
}: PropsListColaborators) => {
  return (
    <ul className="list-colaborates">
      {collaborators.length > 0 &&
        collaborators.map((user) => (
          <li className="colaborate" key={user.id}>
            {user.username}
            {actualUser === creator ? (
              <img
                src={iconDelete.src}
                alt="icon delete colaborate"
                width={25}
                height={25}
                loading="lazy"
                className="delete-colaborate"
                title="eliminar colaborador"
                onClick={() => deleteColaborate(user.id)}
              />
            ) : null}
          </li>
        ))}
    </ul>
  );
};

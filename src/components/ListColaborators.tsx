import { Colaborator } from "@/types/global";
import iconDelete from "../assets/icons/deleteColaborate.svg";
import { deleteColaborate } from "@/libs/lib_colaborators";

interface PropsListColaborators {
  colaborators: Colaborator[];
  actualUser: string;
  creator: string;
}

export const ListColaborators = ({
  colaborators,
  actualUser,
  creator,
}: PropsListColaborators) => {
  return (
    <ul className="list-colaborates">
      {colaborators.length > 0 &&
        colaborators.map((user, index) => (
          <li className="colaborate" key={index}>
            {user.name}
            {actualUser === creator ? (
              <img
                src={iconDelete.src}
                alt="icon delete colaborate"
                width={25}
                height={25}
                loading="lazy"
                className="delete-colaborate"
                title="eliminar colaborador"
                onClick={() => deleteColaborate(user.name)}
              />
            ) : null}
          </li>
        ))}
    </ul>
  );
};

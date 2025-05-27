import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";

class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async initiateSignUp(data: Partial<IUser>): Promise<{ email: string }> {
    if (!data.email || !data.password || !data.userName) {
      throw new Error("Required fields are missing");
    }

    const existingUser = await this.userRepository.findByQuery({
      $or: [{ email: data.email }, { userName: data.userName }],
    });

    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    const userData = {
      ...data,
      role: "user",
      profileImage: "",
      problemsSolved: 0,
      rank: 0,
      isBlocked: false,
      joinedDate: new Date(),
      solvedProblems: [],
      submissions: [],
      contestParticipations: [],
    };

    userData.password = await bcrypt.hash(data.password, 10);

    return { email: data.email };
  }






  async loginUser( email: string, password: string ): Promise<{ user: IUser; }> {
    console.log("its login user service");
    
    const user = await this.userRepository.findByQuery({ email });
    if(!user){
      console.log("nooo userrrr");
    }

    if (!user) {
      throw new Error("User not found");
      
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return {user}
  }


  async logout( email: string ): Promise<{ user: IUser; }> {
    
    const user = await this.userRepository.findByQuery({ email });
    if(!user){
      console.log("nooo userrrr");
    }

    if (!user) {
      throw new Error("User not found");
      
    }


    return {user}
  }


}

export default UserService;

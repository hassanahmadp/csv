"use client";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { changePassword, getAllUsers, logIn, logout, setPasswordOfUser, signUp } from "@/lib";
import toast from "react-hot-toast";
import { LoadingButton } from "../General";

type Props = {
  variant: "login" | "sign up" | "set pass" | "change pass";
  through?: "route" | "modal";
  setShowModal?: any;
  userId?: string | number;
};

function LoginForm({ loading }: { loading: boolean }) {
  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Sign in to your account
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="name@company.com"
            required
            autoComplete="email"
          />
        </div>
        <div className=" relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => !prev)}
          >
            {!showPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>

        <LoadingButton
          loading={loading}
          buttonProps={{
            type: "submit",
            className:
              "w-full relative text-white transition-all duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center",
          }}
        >
          Sign in
        </LoadingButton>

        <div className="flex gap-2 justify-center text-xs mt-4">
          Not a member?
          <Link className="font-semibold hover:underline text-blue-600" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SignUpForm({
  through,
  loading,
}: {
  through?: "route" | "modal";
  loading: boolean;
}) {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Sign Up
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 ">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="Enter First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
            placeholder="name@company.com"
            required
            autoComplete="email"
          />
        </div>
        {/* {through === "modal" &&  */}
        <div className=" relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => !prev)}
          >
            {!showPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>
        {/* } */}

        <LoadingButton
          loading={loading}
          buttonProps={{
            type: "submit",
            className:
              "w-full relative text-white transition-all duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center",
          }}
        >
          Sign Up
        </LoadingButton>

        {through === "route" && (
          <div className="flex gap-2 justify-center text-xs mt-4">
            Already a member?
            <Link className="font-semibold hover:underline text-blue-600" href="/">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export function SetPasswordForm({
  through,
  loading,
}: {
  through?: "route" | "modal";
  loading: boolean;
}) {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Set Password
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div className=" relative mt-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type={`${showPass ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Enter Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => !prev)}
          >
            {!showPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>

        <LoadingButton
          loading={loading}
          buttonProps={{
            color: "#000",
            type: "submit",
            className:
              "w-full relative text-white transition-all duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center",
          }}
        >
          Set Password
        </LoadingButton>
      </div>
    </div>
  );
}
export function ChangePasswordForm({
  through,
  loading,
}: {
  through?: "route" | "modal";
  loading: boolean;
}) {
  const [showPass, setShowPass] = useState<{
    oldPass: boolean;
    newPass: boolean;
  }>({
    oldPass: false,
    newPass: false,
  });
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Change Password
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div className="relative mt-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Old Password
          </label>
          <input
            type={`${showPass.oldPass ? "text" : "password"}`}
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter Old Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => ({ ...prev, oldPass: !prev.oldPass }))}
          >
            {!showPass.oldPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            New Password
          </label>
          <input
            type={`${showPass.newPass ? "text" : "password"}`}
            name="newPassword"
            id="newPassword"
            placeholder="Enter New Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => ({ ...prev, newPass: !prev.newPass }))}
          >
            {!showPass.newPass ? <AiFillEye fontSize="22" /> : <AiFillEyeInvisible fontSize="22" />}
          </div>
        </div>
        {/* <div className="relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Confirm New Password
          </label>
          <input
            type={`${showPass.confirmNewPass ? "text" : "password"}`}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter New Password Again"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required
          />
          <div
            className="absolute bottom-0 flex justify-center items-center h-10 w-10 right-0 opacity-30"
            onClick={() => setShowPass(prev => ({ ...prev, confirmNewPass: !prev.confirmNewPass }))}
          >
            {!showPass.confirmNewPass ? (
              <AiFillEye fontSize="22" />
            ) : (
              <AiFillEyeInvisible fontSize="22" />
            )}
          </div>
        </div> */}

        <LoadingButton
          loading={loading}
          buttonProps={{
            type: "submit",
            className:
              "w-full relative text-white transition-all duration-150 bg-black border border-black hover focus:outline-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center",
          }}
        >
          Change Password
        </LoadingButton>
      </div>
    </div>
  );
}

export function FormContainer({
  variant = "login",
  through = "route",
  setShowModal,
  userId,
}: Props) {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      const obj: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        if (value instanceof File) {
        } else {
          obj[key] = value.toString();
        }
      });

      const { email, password } = obj;

      const response: any = await logIn({ email, password });

      if (!response) {
        setError("Invalid Email or Password");
      } else {
        toast.success("Login Successful!");
        if (response?.data?.role === "ADMIN") router.push("/admin-dashboard");
        else if (response?.data?.role === "USER") router.push("/dashboard");
        else {
        }
      }
      setButtonLoading(false);
    } catch (error: any) {
      setButtonLoading(false);
      console.error({ error: error.message });
      toast.error(error.message);
    }
  };

  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      const data = Object.fromEntries(formData.entries());
      const { firstName, lastName, email, password } = JSON.parse(JSON.stringify(data));
      await signUp({ firstName, lastName, email, password });
      toast.success("Signup Successful.");
      through === "route" && router.push("/");
      through === "modal" && setShowModal(false);
    } catch (error: any) {
      setButtonLoading(false);
      console.error({ error: error.message });
    }
  };

  const handleSetPassSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      const formDataValues = Object.fromEntries(formData.entries());
      const data = JSON.parse(JSON.stringify(formDataValues));
      console.log(userId);

      const response = await setPasswordOfUser(`${userId}`, data);
      if (response?.data.success) {
        toast.success("Password has been set successfully.");
        setShowModal && setShowModal(false);
        if (through === "route") {
          await logout();
          router.push("/");
        }
      } else {
        setButtonLoading(false);
        toast.error("There is some issue in setting the password");
      }
    } catch (error: any) {
      setButtonLoading(false);
      console.error({ error: error.message });
    }
  };
  const handleChangePassSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      const data = Object.fromEntries(formData.entries());

      const { oldPassword, newPassword } = JSON.parse(JSON.stringify(data));

      const response = await changePassword(`${userId}`, {
        oldPass: oldPassword,
        newPass: newPassword,
      });

      if (response?.data?.success) {
        toast.success("Password Successfully Changed");
        setShowModal(false);
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error: any) {
      setButtonLoading(false);
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <form
      onSubmit={
        variant === "login"
          ? handleSubmit
          : variant === "sign up"
          ? handleSignUpSubmit
          : variant === "set pass"
          ? handleSetPassSubmit
          : variant === "change pass"
          ? handleChangePassSubmit
          : e => {
              e.preventDefault();
              console.error({ error: `${variant} type of form not available` });
            }
      }
      className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 "
    >
      {variant === "login" && <LoginForm loading={buttonLoading} />}
      {variant === "sign up" && <SignUpForm loading={buttonLoading} through={through} />}
      {variant === "set pass" && <SetPasswordForm loading={buttonLoading} through={through} />}
      {variant === "change pass" && (
        <ChangePasswordForm loading={buttonLoading} through={through} />
      )}
    </form>
  );
}

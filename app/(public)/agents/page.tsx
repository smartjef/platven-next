import HeroSection from "@/components/hero-seaction";
import prisma from "@/prisma/client";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const AgentPage = async () => {
  const agents = await prisma.team.findMany({ include: { user: true } });
  return (
    <div className="flex flex-col  space-y-10">
      {/* hero */}
      <HeroSection
        subTitle="Agents"
        title="Meet All Our Agents"
        description="Huge number of propreties availabe here for buy and sell,
also you can find here co-living property"
      />
      {/* hero */}
      {/* Main Body */}
      <div className="flex justify-center ">
        <div className="flex flex-col space-y-10 lg:max-w-[80%]">
          {/* Agents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {agents.map(
              (
                { id, image, user: { name, email, phoneNumber }, position },
                index,
              ) => (
                <div key={`${index}-${id}`} className="mb-6 lg:mb-0">
                  <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        src={`/${image}`}
                        className="w-full rounded-t-lg h-400"
                      />
                      <Link href={`#`}>
                        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed" />
                      </Link>
                      {/* Shape bellow */}
                      {shapes[2]}
                    </div>
                    <div className="p-6">
                      <h5 className="mb-4 text-lg font-bold">{name}</h5>
                      <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                        {position}
                      </p>
                      <ul className="mx-auto flex list-inside justify-center">
                        {email && (
                          <a
                            target="_blank"
                            href={`mailto:${email}`}
                            className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                            aria-label="Facebook"
                          >
                            <Mail />
                          </a>
                        )}
                        {phoneNumber && (
                          <a
                            target="_blank"
                            href={`tel:${phoneNumber}`}
                            className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                            aria-label="Facebook"
                          >
                            <PhoneCall />
                          </a>
                        )}
                        {/* {facebook && (
                        <a
                          target="_blank"
                          href={facebook}
                          className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                          aria-label="Facebook"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#039be5"
                              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                            ></path>
                          </svg>
                        </a>
                      )}
                      {twitter && (
                        <a
                          target="_blank"
                          href={twitter}
                          className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                          aria-label="Twitter"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#03A9F4"
                              d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                            ></path>
                          </svg>
                        </a>
                      )}
                      {linkedIn && (
                        <a
                          target="_blank"
                          href={linkedIn}
                          className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                          aria-label="LinkedIn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#0288D1"
                              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                            ></path>
                            <path
                              fill="#FFF"
                              d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                            ></path>
                          </svg>
                        </a>
                      )}
                      {instagram && (
                        <a
                          target="_blank"
                          href={instagram}
                          className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                          aria-label="Instagram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 48 48"
                          >
                            <radialGradient
                              id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                              cx="19.38"
                              cy="42.035"
                              r="44.899"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#fd5"></stop>
                              <stop offset=".328" stop-color="#ff543f"></stop>
                              <stop offset=".348" stop-color="#fc5245"></stop>
                              <stop offset=".504" stop-color="#e64771"></stop>
                              <stop offset=".643" stop-color="#d53e91"></stop>
                              <stop offset=".761" stop-color="#cc39a4"></stop>
                              <stop offset=".841" stop-color="#c837ab"></stop>
                            </radialGradient>
                            <path
                              fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                              d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                            ></path>
                            <radialGradient
                              id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                              cx="11.786"
                              cy="5.54"
                              r="29.813"
                              gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#4168c9"></stop>
                              <stop
                                offset=".999"
                                stop-color="#4168c9"
                                stop-opacity="0"
                              ></stop>
                            </radialGradient>
                            <path
                              fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                              d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                            ></path>
                            <circle
                              cx="31.5"
                              cy="16.5"
                              r="1.5"
                              fill="#fff"
                            ></circle>
                            <path
                              fill="#fff"
                              d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                            ></path>
                          </svg>
                        </a>
                      )} */}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
          {/* Agents */}
        </div>
      </div>
    </div>
  );
};

export default AgentPage;

const shapes = [
  <svg
    className="absolute text-white dark:text-neutral-700 left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
  <svg
    className="absolute text-white dark:text-neutral-700  left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
  <svg
    className="absolute text-white dark:text-neutral-700 left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
];

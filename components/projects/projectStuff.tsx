import { FC, useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { Config } from "./config";
import { ProjectCard } from "./projectCard";
import { Info } from "./info";

interface ProjConfig {
  repo: string;
}

interface ProjRes {
  html_url: string;
  language: string;
  description: string;
  name: string;
  id: number;
}

export const ProjStuff: FC = () => {
  const projs: ProjConfig[] = Config;
  const key = process.env.GBHUBKEY;
  const owner = "LachlanStephan";
  const [project, setProject] = useState<ProjRes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [infoData, setInfoData] = useState<any>([]);

  const octokit = new Octokit({
    auth: key,
  });

  const getProjectData = async (repo: string) => {
    const req: any = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });
    const res = await req;
    return res.data;
  };

  const setProjectData = async () => {
    setLoading(true);
    const p: ProjRes[] = [];
    for (let i = 0; i < projs.length; i++) {
      console.log(projs[i].repo);
      const x: ProjRes = await getProjectData(projs[i].repo);
      p.push(x);
    }
    setProject(p);
    setLoading(false);
  };

  const showInfoModal = async (data: any) => {
    setInfoData(await data);
    setShowInfo(true)
  };    

  const closeModal = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    setProjectData();
  }, []);

  return (
    <>
      {showInfo ? <Info data={infoData} closeModal={closeModal} /> : null}

      {loading ? (
        <div>Loading...</div>
      ) : (
        project.map((p: ProjRes, i: number) => {
          return (
            <ProjectCard
              key={i}
              showInfo={showInfoModal}
              name={p.name}
              language={p.language}
              desc={p.description}
              html_url={p.html_url}
              id={p.id}
            />
          );
        })
      )}
    </>
  );
};

import ScrollReveal from "@/blocks/TextAnimations/ScrollReveal/ScrollReveal";
import React from "react";

export function AboutMe() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            藤井 貴浩 (Takahiro Fujii)
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Product Engineer / Software Engineer / Designer
          </p>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={6}
            textClassName="text-base text-gray-600 dark:text-gray-400"
          >
            WealthPark 株式会社にて CTO としてプロダクト開発を牽引。
            その側、LLMを駆使してエンジニアとしてプロダクト開発・UI/UX設計も行う。
            大学卒業後、楽天株式会社に入社し、楽天トラベルの開発業務に従事。国際業務チームにて、海外ホテルの予約システムや管理画面、経理システム、インバウンドサイト、外部システム連携など、複数の新規サービスの立ち上げおよび開発に携わる。フルスタックエンジニアとしてキャリアをスタートし、2017年以降は
            UI/UX領域を専門とするエンジニアおよびエンジニアリングマネージャとして、WebフロントエンドやAndroid/iOSアプリ開発チームのマネジメント、サービス・組織の成長を牽引。
            2020年にWealthParkへ参画。VPoEとして多国籍なエンジニア組織の構築・強化に注力しつつ、不動産管理システムをはじめとする複数サービスの開発をリード。2024年より現職であるCTOに就任。
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

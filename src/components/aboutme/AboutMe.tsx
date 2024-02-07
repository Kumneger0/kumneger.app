"use client";

function AboutMe() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <img
          alt="Your Name"
          className="aspect-square rounded-full object-cover"
          height="200"
          src="https://pics.craiyon.com/2023-10-03/c64134a721434b048ae228cc6a16643e.webp"
          width="200"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Kumneger Wondimu (a.k.a Kune)</h1>
        <p className="text-lg text-gray-300">
          👨‍💻 A passionate Full Stack Developer based in Ethiopia 🇪🇹 with
          experience in building applications with JavaScript / React / Node.js
          and some other cool libraries and frameworks. I write about web
          development on my blog 🌐💡💻
        </p>
        <h2 className="text-2xl font-semibold">Tools I use the most</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>JavaScript </li>
          <li>TypeScript</li>
          <li>Next.js</li>
          <li>Tailwind CSS</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;

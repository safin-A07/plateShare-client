const CommunityStories = () => {
  const stories = [
    {
      id: 1,
      title: "Foodies Place Restaurant",
      content:
        "By donating surplus meals every night, Foodies Place has helped feed over 2,000 people in need this year.",
      image: "https://i.ibb.co.com/k22fx1nH/handsome-happy-african-american-bearded-600nw-2460702995.webp",
    },
    {
      id: 2,
      title: "Hope Charity Foundation",
      content:
        "Hope Charity has distributed over 5,000 donated meals across the city, supporting underprivileged families.",
      image: "https://i.ibb.co.com/hJ9fBfvq/download-1.jpg",
    },
    {
      id: 3,
      title: "Green Earth Initiative",
      content:
        "Through food recovery and eco-friendly practices, Green Earth has reduced waste and cut CO₂ emissions by 10 tons.",
      image: "https://i.ibb.co.com/GvqtqM1F/download-2.jpg",
    },
  ];

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Community Stories</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-gray-50 rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-600">{story.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;

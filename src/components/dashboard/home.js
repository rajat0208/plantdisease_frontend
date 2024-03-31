import React, { useState, useEffect, useRef } from 'react';
import '../../css/home.css';
import  Login  from '../../auth/login'; // Import the Login component

import AppleCedar from "../../image/applecedar.jpg";
import AppleScab from '../../image/applescab.jpg';
import CommonCornRust from '../../image/corncommonrust.png';
import PotatoEarlyBlight from '../../image/potatoearlyblight.jpeg';
import TomatoEarlyBlight from '../../image/tomatoearlyblight.jpg';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Apple Cedar',
      content: "Apple cedar rust is a persistent challenge for apple growers, often causing significant damage to trees and impacting fruit quality. Understanding the nature of this fungal disease and implementing effective solutions is crucial for maintaining healthy orchards and ensuring a fruitful harvest. In this blog post, we'll delve into the details of apple cedar rust, explore its lifecycle, symptoms, and most importantly, discuss practical strategies to manage and combat this troublesome disease.Apple cedar rust is caused by the fungus Gymnosporangium juniperi-virginianae and involves a complex lifecycle that spans both apple and juniper trees. The fungus requires both hosts to complete its lifecycle, making it particularly challenging to control in regions where these trees grow in close proximity.",
      solution:"To combat apple cedar rust, orchardists can employ a combination of cultural, chemical, and biological control methods. Cultural practices such as pruning infected branches, removing nearby juniper hosts, and improving air circulation can help reduce disease pressure. Additionally, applying fungicides at appropriate timings during the growing season can protect susceptible apple varieties from infection. Biological control agents, such as beneficial fungi or bacteria, may also play a role in managing apple cedar rust.",
      imageUrl: AppleCedar,
      fullContent: "",
    },
    {
      id: 2,
      title: 'Apple Scab',
      content: "Apple scab, caused by the fungus Venturia inaequalis, is one of the most common and destructive diseases affecting apple trees worldwide. This fungal infection can lead to significant losses in fruit yield and quality if left unmanaged. In this blog post, we'll explore the intricacies of apple scab, from its lifecycle and symptoms to effective management strategies that can help orchardists protect their apple trees and ensure a successful harvest.Apple scab thrives in temperate climates and is particularly problematic during periods of cool, wet weather. The fungus overwinters in infected leaves and fruit on the orchard floor, where it produces spores that can infect new growth in the spring. Once established, apple scab can spread rapidly, causing lesions on leaves, fruit, and even young twigs",
      imageUrl: AppleScab,
      fullContent: "",
    },
    {
      id: 3,
      title: 'Corn Common Rust',
      content: "Corn common rust, caused by the fungus Puccinia sorghi, is a widespread disease that poses a significant threat to corn crops worldwide. Characterized by the appearance of small, reddish-brown pustules on the leaves, common rust can lead to yield losses if left unchecked. In this blog post, we'll delve into the details of corn common rust, exploring its lifecycle, symptoms, and practical strategies for managing and mitigating its impact on corn production.Corn common rust thrives in warm, humid conditions, making it prevalent in regions with temperate climates. The fungus overwinters on crop residues and alternative hosts, such as volunteer corn plants or grass species. In the spring, spores produced by the fungus are carried by wind currents to new corn growth, where they initiate infection. ",
      imageUrl: CommonCornRust,
      fullContent: "",
    },
    {
      id: 4,
      title: 'Potato Early Blight',
      content: "Potato early blight, caused by the fungus Alternaria solani, is a common and widespread disease that poses a significant threat to potato crops worldwide. Characterized by dark lesions on leaves, early blight can reduce yield and quality if left uncontrolled. In this blog post, we'll explore the ins and outs of potato early blight, from its lifecycle and symptoms to practical strategies for prevention and management, empowering potato growers to protect their crops and optimize their harvests.Potato early blight thrives in warm, humid conditions, making it prevalent in regions with temperate climates. The fungus overwinters in infected plant debris in the soil and is spread by wind, rain, and irrigation water. Infection typically occurs through the leaves, but can also affect stems and tubers under favorable conditions",
      imageUrl: PotatoEarlyBlight,
      fullContent: "",
    },
    {
      id: 5,
      title: 'Tomato  Early Blight',
      content: "Potato early blight, caused by the fungus Alternaria solani, is a common and widespread disease that poses a significant threat to potato crops worldwide. Characterized by dark lesions on leaves, early blight can reduce yield and quality if left uncontrolled. In this blog post, we'll explore the ins and outs of potato early blight, from its lifecycle and symptoms to practical strategies for prevention and management, empowering potato growers to protect their crops and optimize their harvests.Potato early blight thrives in warm, humid conditions, making it prevalent in regions with temperate climates. The fungus overwinters in infected plant debris in the soil and is spread by wind, rain, and irrigation water. Infection typically occurs through the leaves, but can also affect stems and tubers under favorable conditions",
      imageUrl: TomatoEarlyBlight,
      fullContent: "",
    },
  ];

  const [expandedPostId, setExpandedPostId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const toggleExpand = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  const isExpanded = (postId) => postId === expandedPostId;

  const handleLoginSuccess = () => {
    setShowLogin(false); // Close the login modal
    // Toggle the expansion of the blog post to show the solution
    setExpandedPostId(expandedPostId === null ? 1 : null);
  };

  return (
    <div className='whole-container'>
      <div className="blog-container">
        <h2>Plant Diseases and Solutions</h2>
        <div className="blogarea">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <img src={post.imageUrl} alt={post.title} />
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{isExpanded(post.id) ? post.fullContent : post.content}</p>
                <p>For Solutions: {!isExpanded(post.id) && (
                  <button onClick={() => setShowLogin(true)}>Read More</button>
                )}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Blog;

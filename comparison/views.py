from rest_framework.views import APIView
from rest_framework.response import Response
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64

class CompareAbstracts(APIView):
    def post(self, request):
        abstracts = request.data.get('abstracts', [])
        if len(abstracts) < 2:
            return Response({"error": "Minimal memiliki 2 Abstrak!."}, status=400)

        # TF-IDF calculation
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(abstracts)
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # Generate heatmap
        plt.figure(figsize=(10, 8))
        sns.heatmap(cosine_sim, annot=True, fmt=".2f", cmap="coolwarm", 
                    xticklabels=[f"Abs {i+1}" for i in range(len(abstracts))],
                    yticklabels=[f"Abs {i+1}" for i in range(len(abstracts))])
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        buffer.close()

        # Analyze similarities
        n = cosine_sim.shape[0]
        similar_pairs = []
        for i in range(n):
            for j in range(i + 1, n):
                similarity_percent = cosine_sim[i, j] * 100  # Convert to percentage
                similar_pairs.append((i, j, similarity_percent))

        return Response({
            "heatmap": image_base64,
            "similar_pairs": similar_pairs
        })

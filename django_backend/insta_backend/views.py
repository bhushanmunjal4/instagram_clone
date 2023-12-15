# myapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User  # Import the User model
from .serializers import UserSerializer

from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie


class SignUpView(APIView):
    def post(self, request):
        try:
            print("Received data:", request.data)

            # WARNING: Storing password in plain text (for testing purposes only)
            # In production, always hash passwords before saving.
            plain_text_password = request.data.pop("password", "")

            # Create a user instance without saving it to the database
            user, created = User.objects.get_or_create(
                **request.data, defaults={"password": plain_text_password}
            )

            if not created:
                error_message = "Email or username is already in use."
                status_code = status.HTTP_400_BAD_REQUEST
            else:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            error_message = "Internal Server Error"
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            print("Error in signup view:", str(e))

        # Reset request.data to its original state
        request.data["password"] = plain_text_password

        return Response({"error": error_message}, status=status_code)


class LoginView(APIView):
    def post(self, request):
        try:
            print("Received login data:", request.data)

            email = request.data.get("email", "")
            password = request.data.get("password", "")

            # Find the user with the given email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"error": "Invalid email"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # Check if the provided password matches the hashed password
            if check_password(password, user.password):
                login(request, user)

                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Invalid password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            print("Error in login view:", str(e))
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

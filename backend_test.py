#!/usr/bin/env python3
"""
Backend API Testing Script for Task Manager
Tests all authentication and CRUD operations
"""

import requests
import json
import sys
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "https://46225972-f8a8-4ff7-80d0-8097a4616c62.preview.emergentagent.com/api"
HEADERS = {"Content-Type": "application/json"}

class TaskManagerTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.auth_token = None
        self.user_id = None
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Optional[Dict] = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        })
        
        if not success:
            if details:
                print(f"   Details: {json.dumps(details, indent=2)}")
    
    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, auth_required: bool = False) -> tuple:
        """Make HTTP request and return (success, response_data, status_code)"""
        url = f"{self.base_url}{endpoint}"
        headers = self.headers.copy()
        
        if auth_required and self.auth_token:
            headers["Authorization"] = f"Bearer {self.auth_token}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers, timeout=30)
            elif method.upper() == "POST":
                response = requests.post(url, headers=headers, json=data, timeout=30)
            elif method.upper() == "PUT":
                response = requests.put(url, headers=headers, json=data, timeout=30)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                return False, {"error": f"Unsupported method: {method}"}, 0
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}
            
            return response.status_code < 400, response_data, response.status_code
            
        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}, 0
    
    def test_user_registration(self):
        """Test user registration endpoint"""
        test_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@example.com",
            "password": "SecurePass123!"
        }
        
        success, response, status_code = self.make_request("POST", "/auth/register", test_data)
        
        if success and status_code == 200:
            if "access_token" in response and "user" in response:
                self.auth_token = response["access_token"]
                self.user_id = response["user"]["id"]
                self.log_test("User Registration", True, "User registered successfully")
                return True
            else:
                self.log_test("User Registration", False, "Missing token or user in response", response)
                return False
        else:
            self.log_test("User Registration", False, f"Registration failed (Status: {status_code})", response)
            return False
    
    def test_user_login(self):
        """Test user login endpoint"""
        test_data = {
            "email": "sarah.johnson@example.com",
            "password": "SecurePass123!"
        }
        
        success, response, status_code = self.make_request("POST", "/auth/login", test_data)
        
        if success and status_code == 200:
            if "access_token" in response and "user" in response:
                # Update token for subsequent tests
                self.auth_token = response["access_token"]
                self.log_test("User Login", True, "User logged in successfully")
                return True
            else:
                self.log_test("User Login", False, "Missing token or user in response", response)
                return False
        else:
            self.log_test("User Login", False, f"Login failed (Status: {status_code})", response)
            return False
    
    def test_get_current_user(self):
        """Test get current user endpoint"""
        success, response, status_code = self.make_request("GET", "/auth/me", auth_required=True)
        
        if success and status_code == 200:
            if "id" in response and "email" in response and "name" in response:
                self.log_test("Get Current User", True, "User profile retrieved successfully")
                return True
            else:
                self.log_test("Get Current User", False, "Missing user fields in response", response)
                return False
        else:
            self.log_test("Get Current User", False, f"Failed to get user profile (Status: {status_code})", response)
            return False
    
    def test_create_category(self):
        """Test create category endpoint"""
        test_data = {
            "name": "Work Projects",
            "color": "#3B82F6"
        }
        
        success, response, status_code = self.make_request("POST", "/categories", test_data, auth_required=True)
        
        if success and status_code == 200:
            if "id" in response and response["name"] == "Work Projects":
                self.category_id = response["id"]
                self.log_test("Create Category", True, "Category created successfully")
                return True
            else:
                self.log_test("Create Category", False, "Invalid category response", response)
                return False
        else:
            self.log_test("Create Category", False, f"Failed to create category (Status: {status_code})", response)
            return False
    
    def test_get_categories(self):
        """Test get categories endpoint"""
        success, response, status_code = self.make_request("GET", "/categories", auth_required=True)
        
        if success and status_code == 200:
            if isinstance(response, list):
                self.log_test("Get Categories", True, f"Retrieved {len(response)} categories")
                return True
            else:
                self.log_test("Get Categories", False, "Response is not a list", response)
                return False
        else:
            self.log_test("Get Categories", False, f"Failed to get categories (Status: {status_code})", response)
            return False
    
    def test_create_task(self):
        """Test create task endpoint"""
        due_date = (datetime.utcnow() + timedelta(days=7)).isoformat()
        
        test_data = {
            "title": "Complete quarterly report",
            "description": "Prepare and submit the Q4 financial report",
            "priority": "high",
            "category_id": getattr(self, 'category_id', None),
            "due_date": due_date
        }
        
        success, response, status_code = self.make_request("POST", "/tasks", test_data, auth_required=True)
        
        if success and status_code == 200:
            if "id" in response and response["title"] == "Complete quarterly report":
                self.task_id = response["id"]
                self.log_test("Create Task", True, "Task created successfully")
                return True
            else:
                self.log_test("Create Task", False, "Invalid task response", response)
                return False
        else:
            self.log_test("Create Task", False, f"Failed to create task (Status: {status_code})", response)
            return False
    
    def test_get_tasks(self):
        """Test get tasks endpoint"""
        success, response, status_code = self.make_request("GET", "/tasks", auth_required=True)
        
        if success and status_code == 200:
            if isinstance(response, list):
                self.log_test("Get Tasks", True, f"Retrieved {len(response)} tasks")
                return True
            else:
                self.log_test("Get Tasks", False, "Response is not a list", response)
                return False
        else:
            self.log_test("Get Tasks", False, f"Failed to get tasks (Status: {status_code})", response)
            return False
    
    def test_update_task(self):
        """Test update task endpoint"""
        if not hasattr(self, 'task_id'):
            self.log_test("Update Task", False, "No task ID available for update test")
            return False
        
        test_data = {
            "status": "in_progress",
            "description": "Updated: Prepare and submit the Q4 financial report with charts"
        }
        
        success, response, status_code = self.make_request("PUT", f"/tasks/{self.task_id}", test_data, auth_required=True)
        
        if success and status_code == 200:
            if response.get("status") == "in_progress":
                self.log_test("Update Task", True, "Task updated successfully")
                return True
            else:
                self.log_test("Update Task", False, "Task status not updated correctly", response)
                return False
        else:
            self.log_test("Update Task", False, f"Failed to update task (Status: {status_code})", response)
            return False
    
    def test_analytics(self):
        """Test analytics endpoint"""
        success, response, status_code = self.make_request("GET", "/analytics", auth_required=True)
        
        if success and status_code == 200:
            required_fields = ["total_tasks", "completed_tasks", "completion_rate", "productivity_score"]
            if all(field in response for field in required_fields):
                self.log_test("Analytics", True, "Analytics data retrieved successfully")
                return True
            else:
                missing_fields = [field for field in required_fields if field not in response]
                self.log_test("Analytics", False, f"Missing fields: {missing_fields}", response)
                return False
        else:
            self.log_test("Analytics", False, f"Failed to get analytics (Status: {status_code})", response)
            return False
    
    def test_notifications(self):
        """Test notifications endpoint"""
        success, response, status_code = self.make_request("GET", "/notifications", auth_required=True)
        
        if success and status_code == 200:
            if isinstance(response, list):
                self.log_test("Notifications", True, f"Retrieved {len(response)} notifications")
                return True
            else:
                self.log_test("Notifications", False, "Response is not a list", response)
                return False
        else:
            self.log_test("Notifications", False, f"Failed to get notifications (Status: {status_code})", response)
            return False
    
    def test_authentication_flow(self):
        """Test complete authentication flow"""
        print("\n🔐 Testing Authentication Flow...")
        
        # Test registration
        if not self.test_user_registration():
            return False
        
        # Test login
        if not self.test_user_login():
            return False
        
        # Test get current user
        if not self.test_get_current_user():
            return False
        
        return True
    
    def test_task_management(self):
        """Test task management operations"""
        print("\n📋 Testing Task Management...")
        
        # Test create category first
        self.test_create_category()
        
        # Test get categories
        self.test_get_categories()
        
        # Test create task
        if not self.test_create_task():
            return False
        
        # Test get tasks
        if not self.test_get_tasks():
            return False
        
        # Test update task
        if not self.test_update_task():
            return False
        
        return True
    
    def test_analytics_and_notifications(self):
        """Test analytics and notifications"""
        print("\n📊 Testing Analytics and Notifications...")
        
        # Test analytics
        self.test_analytics()
        
        # Test notifications
        self.test_notifications()
        
        return True
    
    def run_all_tests(self):
        """Run all tests"""
        print(f"🚀 Starting Backend API Tests for Task Manager")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)
        
        # Test authentication flow
        auth_success = self.test_authentication_flow()
        
        if not auth_success:
            print("\n❌ Authentication tests failed. Cannot proceed with other tests.")
            return False
        
        # Test task management
        self.test_task_management()
        
        # Test analytics and notifications
        self.test_analytics_and_notifications()
        
        # Print summary
        self.print_summary()
        
        return True
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n❌ Failed Tests:")
            for test in self.test_results:
                if not test["success"]:
                    print(f"  - {test['test']}: {test['message']}")
        
        print("\n" + "=" * 60)

def main():
    """Main function"""
    tester = TaskManagerTester()
    success = tester.run_all_tests()
    
    if success:
        print("✅ All critical tests completed")
    else:
        print("❌ Some tests failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
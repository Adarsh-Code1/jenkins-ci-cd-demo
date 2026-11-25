import unittest
import app as app_module

from app import app, tasks


class TaskManagerTests(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        tasks.clear()
        app_module.next_task_id = 1

    def test_home_page_loads(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_add_task(self):
        response = self.client.post(
            "/api/tasks",
            json={"title": "Complete Jenkins project"}
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json()["title"],
            "Complete Jenkins project"
        )

    def test_reject_empty_task(self):
        response = self.client.post(
            "/api/tasks",
            json={"title": " "}
        )

        self.assertEqual(response.status_code, 400)

    def test_complete_task(self):
        created = self.client.post(
            "/api/tasks",
            json={"title": "Study Flask"}
        )

        task_id = created.get_json()["id"]
        response = self.client.put(f"/api/tasks/{task_id}")

        self.assertTrue(response.get_json()["completed"])

    def test_delete_task(self):
        created = self.client.post(
            "/api/tasks",
            json={"title": "Delete me"}
        )

        task_id = created.get_json()["id"]
        response = self.client.delete(f"/api/tasks/{task_id}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            self.client.get("/api/tasks").get_json(),
            []
        )


if __name__ == "__main__":
    unittest.main()